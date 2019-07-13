import * as React from 'react'
import { Link } from 'react-router-dom'

export class Page404 extends React.Component {

  render() {
    return (
      <div>
        <h1>Not Found</h1>
        <p className="zoom-area">
          <i> You  are  request  something  that  simply  doesnt  exist !</i>
        </p>
        <section className="error-container">
          <span className="four">
            <span className="screen-reader-text">4</span>
          </span>
          <span className="zero">
            <span className="screen-reader-text">0</span>
          </span>
          <span className="four">
            <span className="screen-reader-text">4</span>
          </span>
        </section>
        <div className="link-container">
          <Link to="/" className="more-link">Take me Home!</Link>
        </div>
      </div >
    )
  }
}
