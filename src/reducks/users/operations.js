import { push } from 'connected-react-router';
import { auth, db, FirebaseTimestamp } from '../../firebase/index';
import { counterAction_A } from '../calcsys/action';
import { signInAction, signOutAction, updateVoteAction } from './action';

const usersRef = db.collection('userData')

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
              voteRanking: [],
              type: 'special_user'
            }
          }
          else {
            userInitialData = {
              created_at: timestamp,
              email: email,
              uid: uid,
              username: username,
              voteRanking: [],
              type: 'normal_user'
            }
          }

          usersRef.doc(uid).set(userInitialData)
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
          usersRef.doc(uid).get()
            .then(getUser => {
              const udata = getUser.data()

              dispatch(signInAction({
                type: udata.type,
                uid: uid,
                username: udata.username,
                voteRanking: udata.voteRanking
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
        usersRef.doc(uid).get()
          .then(snapshot => {
            const udata = snapshot.data()

            dispatch(signInAction({
              type: udata.type,
              uid: uid,
              username: udata.username,
              voteRanking: udata.voteRanking
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

export const updateVoteRankig = (id) => {
  return async (dispatch, getState) => {
    const state = getState()
    const usersData = state.users
    const uid = usersData.uid
    const voteRanking = usersData.voteRanking
    console.log(usersData)

    let updateFlag = true
    for (const voteData of voteRanking) {
      if (voteData.voteId === id) {
        voteCount: ++voteData.voteCount
        updateFlag = false
        break
      }
    }
    if (updateFlag) {
      const updateVoteRanking = ({
        voteId: id,
        voteCount: 1
      })
      voteRanking.push(updateVoteRanking)
    }

    await usersRef.doc(uid).update(usersData)
      .then(() => {
        dispatch(updateVoteAction(usersData))
      })
  }
}

