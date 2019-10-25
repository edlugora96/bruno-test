import { useState } from "react";
import { useInputValue } from "$utils/hooks";
import { HomeView } from "$react/HomeView";
import fetch from "isomorphic-unfetch";

const Home = () => {
  const email = useInputValue();
  const pass = useInputValue();
  const [state, setState] = useState({
    token: null,
    loading: false,
    listMain: null,
    createList: null,
    listUser: null
  });

  const submit = async e => {
    e.preventDefault();
    setState({
      ...state,
      token: null,
      loading: true
    });
    try {
      const res = await fetch("https://jifcast.org/api/v1/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: email.value,
          password: pass.value
        })
      });
      const body = await res.json();
      setState({
        ...state,
        token: body.token,
        loading: false
      });
      console.log(body);
    } catch (err) {
      setState({
        ...state,
        token: null,
        loading: false
      });
      console.error(err);
    }
  };
  const createListMainBtn = async e => {
    setState({
      ...state,
      createList: null,
      loading: true
    });
    e.preventDefault();
    try {
      const res = await fetch("https://jifcast.org/api/v1/list", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${state.token}`
        },
        body: JSON.stringify({
          name: "If you see it Delete it",
          tag: "Delete me pls",
          channels: [{ channel: "5dac9d1cd543c27777ec7684" }]
        })
      });
      const body = await res.json();
      console.log(body);
      setState({
        ...state,
        createList: JSON.stringify(body.docs) || body.message,
        loading: false
      });
    } catch (err) {
      setState({
        ...state,
        createList: null,
        loading: false
      });
      console.error(err);
    }
  };

  const listMainBtn = async () => {
    setState({
      ...state,
      listMain: null,
      loading: true
    });
    try {
      const res = await fetch("https://jifcast.org/api/v1/list", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${state.token}`
        }
      });
      const body = await res.json();
      console.log(body);
      setState({
        ...state,
        listMain: JSON.stringify(body.docs) || body.message,
        loading: false
      });
    } catch (err) {
      setState({
        ...state,
        listMain: null,
        loading: false
      });
      console.error(err);
    }
  };
  const listUserBtn = async () => {
    setState({
      ...state,
      listUser: null,
      loading: true
    });
    try {
      const res = await fetch("https://jifcast.org/api/v1/users", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${state.token}`
        }
      });
      const body = await res.json();
      setState({
        ...state,
        listUser: JSON.stringify(body.docs) || body.message,
        loading: false
      });
    } catch (err) {
      setState({
        ...state,
        listUser: null,
        loading: false
      });
      console.error(err);
    }
  };

  const sendProps = {
    email,
    pass,
    submit,
    listMainBtn,
    listUserBtn,
    createListMainBtn,
    ...state
  };
  return <HomeView {...sendProps} />;
};

export default Home;
