import React from 'react'
import { Switch, Route } from 'react-router-dom'
import {
  Counter, Home, SignUp, SignIn, RankingCreateForm,
  PwReset, RankingItemList, RankingItemDetail
} from './templates'
import { ConfirmCreateForm } from './components/index'
import Auth from './Auth'

const Router = () => {
  return (
    //path='(/)?'‚ğˆê”Ôã‚É‚·‚é‚Æ‰æ–Ê‘JˆÚ‚ª‚Å‚«‚È‚­‚È‚é
    <Switch>
      
      <Route exact path='/signup' component={SignUp} />
      <Route exact path='/signin' component={SignIn} />
      <Route exact path='/signin/reset' component={PwReset} />
      <Auth>
        <Route exact path='/counter' component={Counter} />
        <Route exact path='/ranking/createform' component={RankingCreateForm} />
        <Route exact path='/ranking/confirmform' component={ConfirmCreateForm} />
        <Route exact path='/ranking/list' component={RankingItemList} />
        
        <Route exact path='(/)?' component={Home} />
        <Route exact path='/ranking/list/:id' component={RankingItemDetail} />
      </Auth>

    </Switch>
  )
}

export default Router