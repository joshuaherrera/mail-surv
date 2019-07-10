import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Header extends Component {
	renderContent() {
		switch (this.props.auth) {
			case null:
				return;
			case false:
				return (
					<li>
						<a href="/auth/google">Login with Google</a>
					</li>
				);
			default:
				return (
					<li>
						<a href="/api/logout">Logout</a>
					</li>
				);
		}
	}
	/*NOTE: use <a> tags when navigating to new html docs ie login etc
			otherwise use Link tags for local navigation with react app
	*/
	render() {
		return (
			<nav>
				<div class="nav-wrapper">
					<Link
						to={this.props.auth ? '/surveys' : '/'}
						class="left brand-logo"
					>
						Emaily
					</Link>
					<ul id="nav-mobile" class="right">
						{this.renderContent()}
					</ul>
				</div>
			</nav>
		);
	}
}

function mapStateToProps({ auth }) {
	//or can use plain state var instead of { auth }
	return { auth }; //equal to: auth: state.auth
}

export default connect(mapStateToProps)(Header);
