// pages/_app.js
import App, { Container as NextContainer } from 'next/app';
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Head from 'next/head';
import Navbar from '../components/Navbar/Navbar';

export default class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    if (ctx.req && ctx.req.session.passport) {
      pageProps.user = ctx.req.session.passport.user;
    }
    return { pageProps };
  }

  constructor(props) {
    super(props);
    this.state = {
      user: props.pageProps.user,
    };
  }

  render() {
    const { Component, pageProps } = this.props;
    const props = {
      ...pageProps,
      user: this.state.user,
    };
    return (
      <NextContainer>
        <Container fluid>
          <Head>
            <title>Dashboard</title>
          </Head>
          <Navbar user={this.state.user} />
          <Component {...props} />
        </Container>
      </NextContainer>
    );
  }
}
