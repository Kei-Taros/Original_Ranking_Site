import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { Counter, Home, SignUp, SignIn, RankingCreateForm } from './templates'
import { ConfirmCreateForm} from './components/index'

const Router = () => {

  return (
    //path='(/)?'‚ğˆê”Ôã‚É‚·‚é‚Æ‰æ–Ê‘JˆÚ‚ª‚Å‚«‚È‚­‚È‚é
    <Switch>
      <Route exact path='/counter' component={Counter} />
      <Route exact path='/signup' component={SignUp} />
      <Route exact path='/signin' component={SignIn} />
      <Route exact path='/ranking/createform' component={RankingCreateForm} />
      <Route exact path='/ranking/confirmform' component={ConfirmCreateForm} />

      <Route path='(/)?' component={Home} />
    </Switch>
  )
}

export default Router