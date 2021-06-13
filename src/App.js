import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Navbar from "./components/Navbar";
import Adminlogin from "./components/Adminlogin";
import Teacherlogin from "./components/Teacherlogin";
import Studentlogin from "./components/Studentlogin";
import { auth,db } from "./components/firebase";
import { useState,useEffect } from "react";
import Navbar1 from "./components/Navbar1";
import Adminpage from "./components/Adminpage";
import Teacherpage from "./components/Teacherpage";
import Studentpage from "./components/Studentpage";
function App() {
  const [user, setUser] = useState(auth.currentUser);
  const [role,setRole]=useState("");
  //admin
  useEffect(() => {
    let isSubscribed = true;
    db.collection("admin").onSnapshot((snap) => {
      const list = snap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      return () => (isSubscribed = false);
    });
  }, []);
  //teacher
  useEffect(() => {
    let isSubscribed = true;
    db.collection("teacher").onSnapshot((snap) => {
      const list = snap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      return () => (isSubscribed = false);
    });
  }, []);
  //student
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
  let arr=["admin","teacher","student"];
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        for(let i=0;i<3;i++)
        {
          db.collection(arr[i]).where("userid","==",auth.currentUser.uid).get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                setRole(arr[i]);
                
                console.log(doc.id, " => ", doc.data());
            });
        })
        .catch((error) => {
            console.log("Error getting documents: ", error);
        });
        }
        
      } else {
        setUser(null);
      }
    });
    return unsubscribe;
  }, []);
  function check()
  {
    console.log(role)
    if(role==="admin")
    {
      return(
        <div>
          <Adminpage/>
        </div>
      ) 
    }
    else if(role==="teacher")
    {
      return(
        <div>
          <Teacherpage/>
        </div>
      )
    }
    else if(role==="student")
    {
      return(
        <div>
          <Studentpage/>
        </div>
      )
    }
  }
  return (
    <div className="App">
      <Router>
        {
          user?(
            <div>
              <Navbar1/>
              <h1 className="d-flex justify-content-center">Welcome {auth.currentUser.displayName}</h1>
              {
                check()
              }
            </div>
          ):(
            <div>
            <Navbar />
        <Switch>
          <Route exact path="/Adminlogin">
            <Adminlogin />
          </Route>
          <Route exact path="/Teacherlogin">
            <Teacherlogin />
          </Route>
          <Route exact path="/Studentlogin">
            <Studentlogin />
          </Route>
        </Switch>
            </div>
          )
        }
      </Router>
    </div>
  );
}

export default App;
