// pages/_app.js
import App from 'next/app';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  render() {
    const { Component, pageProps } = this.props;

    return <Component {...pageProps} />;
  }
}
