import React, { useState,useEffect } from "react";
import { auth,db } from "./firebase";
function Studentlogin() {
    const [type, setType] = useState(false);
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [check,setCheck]=useState();
  useEffect(() => {
    let isSubscribed = true;
    db.collection("student").onSnapshot((snap) => {
      const list = snap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      return () => (isSubscribed = false);
    });
  }, []);
  function login() {
    setType(false);
  }
  function signup() {
    setType(true);
  }
  async function Signup() {
    if (email && password && name) {
      await auth
        .createUserWithEmailAndPassword(email, password)
        .then((value) => {
          console.log(name);
        })
        .then((error) => {
          console.log("error");
        });
        var user = auth.currentUser;
    user
      .updateProfile({
        displayName: name,
      })
      .then((e) => {
        console.log(auth.displayName);
      })
      .catch((e) => {});

      await db.collection("student").add({
        role:"student",
        name,
        email,
        password,
        userid: auth.currentUser.uid
      })
    }

  }
  async function Login() {
    if (email && password) {
        await db.collection("student").where("email","==",email).where("password","==",password).get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                setCheck("true");
            });
        })
        .catch((error) => {
            console.log("Error getting documents: ", error);
        });
        if(check)
        {
          await auth
          .signInWithEmailAndPassword(email, password)
          .then((value) => {
            console.log("logged by" + name);
          })
          .catch((error) => {
            console.log(error);
          });
        }
        else
        {
          alert("invalid credentials");
        }
    } else {
      alert("you should fill all the details");
    }
  }
  return (
    <div>
      <h1 className="d-flex justify-content-center">Student Page</h1>
      <div className="container d-flex justify-content-center my-4">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            type ? Signup() : Login();
          }}
        >
          {type ? (
            <div className="mb-3">
              <label htmlFor="exampleInputName" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleInputName"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          ) : null}
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              onChange={(e) => setEmail(e.target.value)}
            />
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button className="btn btn-primary" onClick={login}>
            Login
          </button>
          <button
            className="btn btn-primary"
            style={{ marginLeft: 10 }}
            onClick={signup}
          >
            Signup
          </button>
        </form>
      </div>
    </div>
  );
}

export default Studentlogin
