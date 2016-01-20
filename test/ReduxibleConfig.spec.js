import expect from 'expect';
import React from 'react';
import ReduxibleConfig from '../src/ReduxibleConfig';

describe('ReduxibleConfig', () => {
  it('returns false if devTools is undefined', () => {
    const config = new ReduxibleConfig();
    expect(config.useDevTools()).toBe(false);
  });

  it('returns false if devTools is false', () => {
    const config = new ReduxibleConfig({
      devTools: undefined
    });
    expect(config.useDevTools()).toBe(false);
  });

  it('returns false if development is undefined', () => {
    const config = new ReduxibleConfig({
      server: false,
      devTools: (<div></div>)
    });
    expect(config.useDevTools()).toBe(false);
  });

  it('returns false if development is false', () => {
    const config = new ReduxibleConfig({
      server: false,
      development: false,
      devTools: true
    });
    expect(config.useDevTools()).toBe(false);
  });

  it('returns false if server is true', () => {
    const config = new ReduxibleConfig({
      server: true,
      development: true,
      devTools: true
    });
    expect(config.useDevTools()).toBe(false);
  });

  it('returns true if server is undefined', () => {
    const config = new ReduxibleConfig({
      development: true,
      devTools: true
    });
    expect(config.useDevTools()).toBe(true);
  });

  it('returns true if server is false', () => {
    const config = new ReduxibleConfig({
      server: false,
      development: true,
      devTools: true
    });
    expect(config.useDevTools()).toBe(true);
  });
});
