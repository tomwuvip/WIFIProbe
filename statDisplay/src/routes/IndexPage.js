import React, { PropTypes } from 'react'
import { connect } from 'dva';
import { BackTop } from 'antd';
import { Helmet } from 'react-helmet';
import { classnames,config, menu } from '../utils';
import '../themes/index.less';
import './IndexPage.less';
import styles from '../components/layout/Layout.less';
import Header from '../components/layout/Header';
import Sider from '../components/layout/Sider';
import Bread from '../components/layout/Bread';
import Footer from '../components/layout/Footer';
import LoginForm from '../components/login/LoginForm';


function IndexPage({ children, location, dispatch, app }) {
  const {user, userId, isLogin, alertVisible, loginMsg, menuPopoverVisible,
    siderFold, darkTheme, isNavbar, navOpenKeys, loading } = app;

  const userLoginProps = {
    userId,
    alertVisible,
    loginMsg,

    onLogin(fieldValue){
      dispatch({
        type: 'app/verify',
        payload: {...fieldValue}
      })
    },

    closeAlert() {
      dispatch({
        type: 'app/closeAlert',
        payload: {}
      })
    }
  };

  const headerProps = {
    menu,
    user,
    siderFold,
    location,
    isNavbar,
    menuPopoverVisible,
    navOpenKeys,

    switchMenuPopover() {
      dispatch({
        type: 'app/switchMenuPopover'
      })
    },

    logout() {
      dispatch({
        type: 'app/logout'
      })
    },

    switchSider(){
      dispatch({
        type: 'app/switchSider'
      })
    },

    changeOpenKeys (openKeys){
      localStorage.setItem('navOpenKeys', JSON.stringify(openKeys));
      dispatch({
        type: 'app/handleNavOpenKeys',
        payload: {navOpenKeys: openKeys}
      })
    }
  };

  let id = user?user.id:user;
  const siderProps = {
    menu,
    siderFold,
    darkTheme,
    location,
    navOpenKeys,
    changeTheme() {
      dispatch({
        type: 'app/changeTheme'
      })
    },
    changeOpenKeys(openKeys){
      localStorage.setItem('navOpenKeys', JSON.stringify(openKeys));
      dispatch({
        type: 'app/handleNavOpenKeys',
        payload: {navOpenKeys: openKeys}
      })
    },
    userId: id
  };

  const breadProps = {
    menu,
  };

  const { iconFontJS, iconFontCSS } = config;

  let test = true;

  return (
    <div>
      {test?
        <div className={classnames(styles.layout, {[styles.fold]: isNavbar ? false : siderFold}, {[styles.withnavbar]: isNavbar})}>
          {!isNavbar ? <aside className={classnames(styles.sider, {[styles.light]: !darkTheme})}>
            <Sider {...siderProps} />
          </aside> : ''}
          <div className={styles.main}>
            <Header {...headerProps} />

            <div className={styles.container}>
              <div className={styles.content}>
                {children}
              </div>
            </div>
            <Footer />
            <BackTop />
          </div>
        </div>:<LoginForm {...userLoginProps} /> }
    </div>
  )


}

IndexPage.propTypes = {
  children: PropTypes.element.isRequired,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  app: PropTypes.object
};

export default connect(({app}) => ({app}))(IndexPage);

