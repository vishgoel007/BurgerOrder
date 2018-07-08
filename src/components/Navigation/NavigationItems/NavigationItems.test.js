import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {NavLink} from 'react-router-dom';

import NavigationItems from './NavigationItems';
import classes from './NavigationItems.css';

configure({adapter: new Adapter()});

describe('<NavigationItems />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<NavigationItems />);
  });

  it('should render two <NavigationItem /> elements if not authenticated', () => {
    expect(wrapper.find(NavLink)).toHaveLength(2);
  });

  it('should render three <NavLink /> elements if authenticated', () => {
    // wrapper = shallow(<NavigationItems isAuthenticated />);
    wrapper.setProps({isAuthenticated: true});
    expect(wrapper.find(NavLink)).toHaveLength(3);
  });

  it('should an exact logout button', () => {
    wrapper.setProps({isAuthenticated: true});
    expect(wrapper.contains(<NavLink to='/logout' activeClassName={classes.active}>Logout</NavLink>)).toEqual(true);
  });
});