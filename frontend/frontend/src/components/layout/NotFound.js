import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import N404 from '../../img/404.gif'

class NotFound extends Component {


  render () {


    return (
      <div className="detailsNotFound">
        <div className="App-content row d-flex justify-content-center" >
          <div className="grid text-center col-md-12">
            <div className='row '>
              <div style={{margin: '10px'}}>
                <Link to='/dashboard' className='btn' style={{background: 'white', color: 'green'}}>
                  <i className="fa fa-chevron-circle-left fa-3x" aria-hidden="true"/></Link>
              </div>
              {/*<h2 className="grid--cell fl1 fs-headline1 text-center" style={{*/}
              {/*  color: 'black'*/}
              {/*}}> Welcome to L V Prasad Cloud</h2>*/}
            </div>
            <div className='row'>
              <img
                src={N404}
                style={{ width: '500px', margin: 'auto', display: 'block' }}
                alt="Loading..."
              />
            </div>
            <Link to='/dashboard' className='btn btn-primary'>Return to Dashboard</Link>
          </div>
        </div>
      </div>

    )
  }
}

NotFound.propTypes = {
  auth: PropTypes.object.isRequired,
  home: PropTypes.object.isRequired,

}

const mapStateToProps = state => ({
  auth: state.auth,
  home: state.home,
})

export default connect(mapStateToProps)(NotFound)

//
// <div className='container' style={{ minHeight: '50%', maxWidth: '60%', maxHeight: '60%', margin: '30px',lineHeight: '1',
//   color: '#000000',background: '#0092ff'}}>
// <div className="at-at">
//   <div className="at-at-content">
//   <div className="at-at-body">
//   <div className="at-at-head">
//   <div className="at-at-neck">
//   <div className="neck-ribs">
//   <div className="neck-cable-first"></div>
// <div className="neck-cable-second"></div>
// <div className="neck-cable-last"></div>
// <i/><i/><i/><i/>
// </div>
// <div className="neck-bg"></div>
// </div>
// <div className="head-bg">
//   <div className="head-snout">
//     <div className="in-head-snout"></div>
//     <div className="head-snout-gun"></div>
//   </div>
//   <i className="head-bg-first"></i>
//   <i className="head-bg-second"></i>
// </div>
// <div className="head">
//   <div className="head-chin">
//   <i className="head-chin-bg-first"></i>
// <i className="head-chin-bg-second"></i>
// <i className="head-gun"></i>
// <i className="fire"><i></i><i></i><i></i></i>
// </div>
// </div>
// <i className="head-left-bg"></i>
// <i className="head-top-bg"></i>
// </div>
// <div className="at-at-body-left">
// <i className="at-at-body-left-bg-1"></i>
// <i className="at-at-body-left-bg-2"></i>
// <i className="at-at-body-left-bg-3"></i>
// <i className="at-at-body-left-bg-4"></i>
// <i className="at-at-body-left-bg-5"></i>
// <div className="at-at-body-left-bg"></div>
// </div>
// <div className="at-at-body-right">
// <i className="at-at-body-right-bg-1"></i>
// <i className="at-at-body-right-bg-2"></i>
// <i className="at-at-body-right-bg-3"></i>
// <i className="at-at-body-right-bg-4"></i>
// <i className="at-at-body-right-bg-5"></i>
// <div className="at-at-body-right-bg"></div>
// </div>
// <div className="at-at-body-bottom">
// <div className="at-at-body-bottom-bg"><i></i><i></i><i></i></div>
// <div className="body-bottom-left"></div>
// </div>
// <div className="at-at-body-bg">
// <i></i><i></i><i></i><i></i>
// <div className="i"></div>
// </div>
// <div className="at-at-body-bg-first-block">
// <i className="at-at-body-bg-first-block-item-1"></i>
// <i className="at-at-body-bg-first-block-item-2"></i>
// <i className="at-at-body-bg-first-block-item-3"></i>
// </div>
// <div className="at-at-body-bg-second-block">
// <i className="at-at-body-bg-second-block-item-1"></i>
// <i className="at-at-body-bg-second-block-item-2"></i>
// </div>
// <div className="at-at-body-bg-third-block">
// <i className="at-at-body-bg-third-block-item-1"></i>
// <i className="at-at-body-bg-third-block-item-2"></i>
// <i className="at-at-body-bg-third-block-item-3"></i>
// </div>
// </div>
// <div className="dark-bg">
// <i className="dark-bg-right"></i>
// </div>
// </div>
// <div className="leg-content leg-front">
// <div className="leg-first-joint"><i></i></div>
// <div className="leg-first">
// <i className="leg-first-hr-a"></i>
// <i className="leg-first-hr-b"></i>
// <div className="in-first-leg">
// <div className="leg-second-joint"><i></i></div>
// <div className="leg-second">
// <i className="leg-second-hr"></i>
// <div className="in-second-leg">
// <div className="foot-joint"><i className="foot-ankle"><i className="foot-ankle-bg"></i></i></div>
// <div className="foot-ankle-bottom"></div>
// <div className="foot-ankle-space"></div>
// <div className="foot">
// <div className="foot-bottom"></div>
// <div className="foot-land"></div>
// </div>
// </div>
// </div>
// </div>
// </div>
// </div>
// <div className="leg-content leg-rear">
// <div className="leg-first-joint"><i></i></div>
// <div className="leg-first">
// <i className="leg-first-hr-a"></i>
// <i className="leg-first-hr-b"></i>
// <div className="in-first-leg">
// <div className="leg-second-joint"><i></i></div>
// <div className="leg-second">
// <i className="leg-second-hr"></i>
// <div className="in-second-leg">
// <div className="foot-joint"><i className="foot-ankle"><i className="foot-ankle-bg"></i></i></div>
// <div className="foot-ankle-bottom"></div>
// <div className="foot-ankle-space"></div>
// <div className="foot">
// <div className="foot-bottom"></div>
// <div className="foot-land"></div>
// </div>
// </div>
// </div>
// </div>
// </div>
// </div>
// <div className="leg-content leg-front-back">
// <div className="leg-first-joint"><i></i></div>
// <div className="leg-first">
// <i className="leg-first-hr-a"></i>
// <i className="leg-first-hr-b"></i>
// <div className="in-first-leg">
// <div className="leg-second-joint"><i></i></div>
// <div className="leg-second">
// <i className="leg-second-hr"></i>
// <div className="in-second-leg">
// <div className="foot-joint"><i className="foot-ankle"><i className="foot-ankle-bg"></i></i></div>
// <div className="foot-ankle-bottom"></div>
// <div className="foot-ankle-space"></div>
// <div className="foot">
// <div className="foot-bottom"></div>
// <div className="foot-land"></div>
// </div>
// </div>
// </div>
// </div>
// </div>
// </div>
// <div className="leg-content leg-rear-back">
// <div className="leg-first-joint"><i></i></div>
// <div className="leg-first">
// <i className="leg-first-hr-a"></i>
// <i className="leg-first-hr-b"></i>
// <div className="in-first-leg">
// <div className="leg-second-joint"><i></i></div>
// <div className="leg-second">
// <i className="leg-second-hr"></i>
// <div className="in-second-leg">
// <div className="foot-joint"><i className="foot-ankle"><i className="foot-ankle-bg"></i></i></div>
// <div className="foot-ankle-bottom"></div>
// <div className="foot-ankle-space"></div>
// <div className="foot">
// <div className="foot-bottom"></div>
// <div className="foot-land"></div>
// </div>
// </div>
// </div>
// </div>
// </div>
// </div>
// </div>
//
// <div className="bg">
// <i className="star star-1"></i>
// <i className="star star-2"></i>
// <i className="star star-3"></i>
// <i className="star star-4"></i>
// <i className="star star-5"></i>
// <i className="star star-6"></i>
// <i className="star-small star-small-1"></i>
// <i className="star-small star-small-2"></i>
// <i className="star-small star-small-3"></i>
// <i className="star-small star-small-4"></i>
// <i className="star-small star-small-5"></i>
// <i className="star-small star-small-6"></i>
// <i className="star-small star-small-7"></i>
// <i className="star-small star-small-8"></i>
// <i className="star-small star-small-9"></i>
// <i className="star-small star-small-10"></i>
// </div>
// <i className="moon"></i>
// <i className="mountain-first">
// <i className="mountain-shadow"></i>
// </i>
// <i className="mountain-second">
// <i className="mountain-shadow"/>
// <span className="mountain-top"/>
// </i>
// <div className="first-bg">
// <div className="first-bg-anim">
// <i className="first"></i>
// <i className="second"></i>
// <i className="third"></i>
// <i className="last"></i>
// </div>
// <div className="second-bg-anim">
// <div className="first-rock-content">
// <div className="rock-content rock-content-1">
// <i className="rock rock-big rock-1"></i>
// <i className="rock rock-big rock-2"></i>
// <i className="rock rock-big rock-3"></i>
// <i className="rock rock-middle rock-7"></i>
// <i className="rock rock-middle rock-8"></i>
// <i className="rock rock-middle rock-9"></i>
// <i className="rock rock-middle rock-10"></i>
// <i className="rock rock-middle rock-11"></i>
// <i className="rock rock-middle rock-12"></i>
// <i className="rock rock-middle rock-13"></i>
// <i className="rock rock-middle rock-14"></i>
// </div>
// <div className="rock-content rock-content-2">
// <i className="rock rock-big rock-1"></i>
// <i className="rock rock-big rock-2"></i>
// <i className="rock rock-big rock-3"></i>
// <i className="rock rock-middle rock-7"></i>
// <i className="rock rock-middle rock-8"></i>
// <i className="rock rock-middle rock-9"></i>
// <i className="rock rock-middle rock-10"></i>
// <i className="rock rock-middle rock-11"></i>
// <i className="rock rock-middle rock-12"></i>
// <i className="rock rock-middle rock-13"></i>
// <i className="rock rock-middle rock-14"></i>
// </div>
// <div className="rock-content rock-content-3">
// <i className="rock rock-big rock-1"></i>
// <i className="rock rock-big rock-2"></i>
// <i className="rock rock-big rock-3"></i>
// <i className="rock rock-middle rock-7"></i>
// <i className="rock rock-middle rock-8"></i>
// <i className="rock rock-middle rock-9"></i>
// <i className="rock rock-middle rock-10"></i>
// <i className="rock rock-middle rock-11"></i>
// <i className="rock rock-middle rock-12"></i>
// <i className="rock rock-middle rock-13"></i>
// <i className="rock rock-middle rock-14"></i>
// </div>
// <div className="rock-content rock-content-4">
// <i className="rock rock-big rock-1"></i>
// <i className="rock rock-big rock-2"></i>
// <i className="rock rock-big rock-3"></i>
// <i className="rock rock-middle rock-7"></i>
// <i className="rock rock-middle rock-8"></i>
// <i className="rock rock-middle rock-9"></i>
// <i className="rock rock-middle rock-10"></i>
// <i className="rock rock-middle rock-11"></i>
// <i className="rock rock-middle rock-12"></i>
// <i className="rock rock-middle rock-13"></i>
// <i className="rock rock-middle rock-14"></i>
// </div>
// <div className="rock-content rock-content-5">
// <i className="rock rock-big rock-1"></i>
// <i className="rock rock-big rock-2"></i>
// <i className="rock rock-big rock-3"></i>
// <i className="rock rock-middle rock-7"></i>
// <i className="rock rock-middle rock-8"></i>
// <i className="rock rock-middle rock-9"></i>
// <i className="rock rock-middle rock-10"></i>
// <i className="rock rock-middle rock-11"></i>
// <i className="rock rock-middle rock-12"></i>
// <i className="rock rock-middle rock-13"></i>
// <i className="rock rock-middle rock-14"></i>
// </div>
// <div className="rock-content rock-content-6">
// <i className="rock rock-big rock-1"></i>
// <i className="rock rock-big rock-2"></i>
// <i className="rock rock-big rock-3"></i>
// <i className="rock rock-middle rock-7"></i>
// <i className="rock rock-middle rock-8"></i>
// <i className="rock rock-middle rock-9"></i>
// <i className="rock rock-middle rock-10"></i>
// <i className="rock rock-middle rock-11"></i>
// <i className="rock rock-middle rock-12"></i>
// <i className="rock rock-middle rock-13"></i>
// <i className="rock rock-middle rock-14"></i>
// </div>
// </div>
// <div className="second-rock-content">
// <div className="rock-content rock-content-1">
// <i className="rock rock-big rock-1"></i>
// <i className="rock rock-big rock-2"></i>
// <i className="rock rock-big rock-3"></i>
// <i className="rock rock-middle rock-7"></i>
// <i className="rock rock-middle rock-8"></i>
// <i className="rock rock-middle rock-9"></i>
// <i className="rock rock-middle rock-10"></i>
// <i className="rock rock-middle rock-11"></i>
// <i className="rock rock-middle rock-12"></i>
// <i className="rock rock-middle rock-13"></i>
// <i className="rock rock-middle rock-14"></i>
// </div>
// <div className="rock-content rock-content-2">
// <i className="rock rock-big rock-1"></i>
// <i className="rock rock-big rock-2"></i>
// <i className="rock rock-big rock-3"></i>
// <i className="rock rock-middle rock-7"></i>
// <i className="rock rock-middle rock-8"></i>
// <i className="rock rock-middle rock-9"></i>
// <i className="rock rock-middle rock-10"></i>
// <i className="rock rock-middle rock-11"></i>
// <i className="rock rock-middle rock-12"></i>
// <i className="rock rock-middle rock-13"></i>
// <i className="rock rock-middle rock-14"></i>
// </div>
// <div className="rock-content rock-content-3">
// <i className="rock rock-big rock-1"></i>
// <i className="rock rock-big rock-2"></i>
// <i className="rock rock-big rock-3"></i>
// <i className="rock rock-middle rock-7"></i>
// <i className="rock rock-middle rock-8"></i>
// <i className="rock rock-middle rock-9"></i>
// <i className="rock rock-middle rock-10"></i>
// <i className="rock rock-middle rock-11"></i>
// <i className="rock rock-middle rock-12"></i>
// <i className="rock rock-middle rock-13"></i>
// <i className="rock rock-middle rock-14"></i>
// </div>
// <div className="rock-content rock-content-4">
// <i className="rock rock-big rock-1"></i>
// <i className="rock rock-big rock-2"></i>
// <i className="rock rock-big rock-3"></i>
// <i className="rock rock-middle rock-7"></i>
// <i className="rock rock-middle rock-8"></i>
// <i className="rock rock-middle rock-9"></i>
// <i className="rock rock-middle rock-10"></i>
// <i className="rock rock-middle rock-11"></i>
// <i className="rock rock-middle rock-12"></i>
// <i className="rock rock-middle rock-13"></i>
// <i className="rock rock-middle rock-14"></i>
// </div>
// <div className="rock-content rock-content-5">
// <i className="rock rock-big rock-1"></i>
// <i className="rock rock-big rock-2"></i>
// <i className="rock rock-big rock-3"></i>
// <i className="rock rock-middle rock-7"></i>
// <i className="rock rock-middle rock-8"></i>
// <i className="rock rock-middle rock-9"></i>
// <i className="rock rock-middle rock-10"></i>
// <i className="rock rock-middle rock-11"></i>
// <i className="rock rock-middle rock-12"></i>
// <i className="rock rock-middle rock-13"></i>
// <i className="rock rock-middle rock-14"></i>
// </div>
// <div className="rock-content rock-content-6">
// <i className="rock rock-big rock-1"></i>
// <i className="rock rock-big rock-2"></i>
// <i className="rock rock-big rock-3"></i>
// <i className="rock rock-middle rock-7"></i>
// <i className="rock rock-middle rock-8"></i>
// <i className="rock rock-middle rock-9"></i>
// <i className="rock rock-middle rock-10"></i>
// <i className="rock rock-middle rock-11"></i>
// <i className="rock rock-middle rock-12"></i>
// <i className="rock rock-middle rock-13"></i>
// <i className="rock rock-middle rock-14"></i>
// </div>
// </div>
// </div>
// </div>
//
// <div className="space-ship space-ship-small">
// <i className="space-ship-wing"></i>
// <i className="space-ship-bg"><i className="space-ship-gun"></i></i>
// </div>
// <div className="space-ship space-ship-big">
// <i className="space-ship-wing"></i>
// <i className="space-ship-bg"><i className="space-ship-gun"></i></i>
// </div>
//
// <div id="back">
// <Link to="/dashboard">
// <img src={require("./back.png")} alt=''/>
// </Link>
// </div>
//
// <div id="quote">
// <p>"These aren’t the droids you’re looking for..."</p>
// </div>
//
// <div id="message">
// <h3>ERROR</h3>
// <h1>404</h1>
// </div>
// </div>