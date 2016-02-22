import { expect } from 'chai';
import React from 'react';
import ReduxibleConfig from '../src/ReduxibleConfig';

describe('ReduxibleConfig', () => {

  it('isServer should returns true when server is true', () => {
    const config = new ReduxibleConfig({
      server: true
    });
    expect(config.isServer()).to.equal(true);
  });

  it('isProduction should returns true when development is false', () => {
    const config = new ReduxibleConfig({
      development: false
    });
    expect(config.isProduction()).to.equal(true);
  });

  describe('useDevTools', () => {
    it('should returns false if devTools is undefined', () => {
      const config = new ReduxibleConfig();
      expect(config.useDevTools()).to.equal(false);
    });

    it('should returns false if devTools is false', () => {
      const config = new ReduxibleConfig({
        devTools: undefined
      });
      expect(config.useDevTools()).to.equal(false);
    });

    it('should returns false if development is undefined', () => {
      const config = new ReduxibleConfig({
        server: false,
        devTools: (<div></div>)
      });
      expect(config.useDevTools()).to.equal(false);
    });

    it('should returns false if development is false', () => {
      const config = new ReduxibleConfig({
        server: false,
        development: false,
        devTools: true
      });
      expect(config.useDevTools()).to.equal(false);
    });

    it('should returns false if server is true', () => {
      const config = new ReduxibleConfig({
        server: true,
        development: true,
        devTools: true
      });
      expect(config.useDevTools()).to.equal(false);
    });

    it('should returns true if server is undefined', () => {
      const config = new ReduxibleConfig({
        development: true,
        devTools: true
      });
      expect(config.useDevTools()).to.equal(true);
    });

    it('should returns true if server is false', () => {
      const config = new ReduxibleConfig({
        server: false,
        development: true,
        devTools: true
      });
      expect(config.useDevTools()).to.equal(true);
    });
  });


  describe('useHashHistory', () => {
    it('should returns true when server and universal is false', () => {
      const config = new ReduxibleConfig({
        server: false,
        universal: false,
        hashHistory: true
      });
      expect(config.useHashHistory()).to.equal(true);
    });

    it('should returns false when server or universal is true even hashHistory is true', () => {
      const config = new ReduxibleConfig({
        server: true,
        universal: false,
        hashHistory: true
      });
      expect(config.useHashHistory()).to.equal(false);

      config.server = false;
      config.universal = true;
      expect(config.useHashHistory()).to.equal(false);

      config.server = true;
      config.universal = true;
      expect(config.useHashHistory()).to.equal(false);
    });

    it('should returns false when hashHistory is false', () => {
      const config = new ReduxibleConfig({
        server: false,
        universal: false,
        hashHistory: false
      });
      expect(config.useHashHistory()).to.equal(false);
    });
  });
});
