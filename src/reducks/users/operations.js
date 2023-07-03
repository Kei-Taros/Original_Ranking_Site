import { push } from 'connected-react-router';
import { auth, db, FirebaseTimestamp } from '../../firebase/index';
import { signInAction, signOutAction } from './action';

export const signUpSystem = (username, email, password, confirmPassword, invitationCode) => {
  return async (dispatch) => {
    if (username === '' || email === '' || password === '' || confirmPassword === '') {
      alert('Input Error')
      return false
    }
    if (password !== confirmPassword) {
      alert('Password Input Error')
      return false
    }

    return auth.createUserWithEmailAndPassword(email, password)
      .then(result => {
        const user = result.user

        if (user) {
          const uid = user.uid
          const timestamp = FirebaseTimestamp.now()
          let userInitialData = {}

          if (invitationCode === '0001') {
            userInitialData = {
              created_at: timestamp,
              email: email,
              uid: uid,
              username: username,
              type: 'special_user'
            }
          }
          else {
            userInitialData = {
              created_at: timestamp,
              email: email,
              uid: uid,
              username: username,
              type: 'normal_user'
            }
          }

          db.collection('userData').doc(uid).set(userInitialData)
            .then(() => {
              dispatch(push('/'))
            })
        }
      })
  }
}

export const signInSystem = (email, password) => {
  return async (dispatch) => {
    if (email === '' || password === '') {
      alert('Input Error')
      return false
    }
    auth.signInWithEmailAndPassword(email, password)
      .then(result => {
        const user = result.user

        if (user) {
          const uid = user.uid
          db.collection('userData').doc(uid).get()
            .then(getUser => {
              const udata = getUser.data()

              dispatch(signInAction({
                type: udata.type,
                uid: uid,
                username: udata.username
              }))
              dispatch(push('/'));
            })
        }
      }
    )

  }
}

export const signOutSystem = () => {
  return async (dispatch) => {
    auth.signOut()
      .then(() => {
        dispatch(signOutAction())
        dispatch(push('/'))
      })
  }
}

export const listenAuthState = () => {
  return async (dispatch) => {
    auth.onAuthStateChanged(user => {
      if (user) {
        const uid = user.uid
        db.collection('userData').doc(uid).get()
          .then(snapshot => {
            const udata = snapshot.data()

            dispatch(signInAction({
              type: udata.type,
              uid: uid,
              username: udata.username
            }))
          })
      }
      else {
        dispatch(push('/signin'))
      }
    })
  }
}

export const pwResetSystem = (email) => {
  return async (dispatch) => {
    if (email === '') {
      alert('Input Error')
      return false
    }

    auth.sendPasswordResetEmail(email)
      .then(() => {
        alert('Send password reset to email')
        dispatch(push('/signin'))
      })
      .catch(() => {
        alert('Failure')
      })
  }
}