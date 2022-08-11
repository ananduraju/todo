import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  ButtonGroup,
  Stack,
  IconButton,
  Divider,
  Box,
  Paper,
  CardContent,
  CardActions,
  Card,
  TextField,
  Typography,
  InputAdornment,
  OutlinedInput,
  FormControl,
  InputLabel,
  FilledInput,
  List,
  ListItemText,
  ListItem,
  Checkbox,
  CircularProgress,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  Visibility,
  KeyboardArrowDown,
  DirectionsCar,
  BarChart,
  AttachMoney,
  Email,
  Apartment,
  DateRange,
  Clear,
} from "@mui/icons-material";
import { useQuery, gql, useMutation } from "@apollo/client";
import { useSpring, animated, easings } from "react-spring";

const GET_USERS = gql`
  query GetUsers {
    users {
      id
      name
    }
  }
`;

const GET_USER = gql`
  query MyQuery($name: String!) {
    users(where: { name: { _eq: $name } }) {
      name
      id
      todos
    }
  }
`;

const ADD_TODO = gql`
  mutation MyMutation($todo: jsonb!) {
    update_users(where: { name: { _eq: "test" } }, _set: { todos: $todo }) {
      returning {
        id
        todos
        name
      }
    }
  }
`;

const theme = createTheme({
  palette: {
    primary: {
      // Purple and green play nicely together.
      main: "#696969",
    },
    secondary: {
      // This is green.A700 as hex.
      main: "#11cb5f",
    },
  },
});

const label = { inputProps: { "aria-label": "Checkbox demo" } };

export default function Main({ name }) {
  const [todos, setTodos] = useState([]);
  const [buttonState, setButtonState] = useState([true, false, false]);
  const [todoFetch, setTodoFetch] = useState(false);
  const [clearCompleted, setClearCompleted] = useState(false);
  const [reload, setReload] = useState(false);
  const [firstLoad, setFirstLoad] = useState(true);
  const [firstLoadTodo, setFirstLoadTodo] = useState(true);
  const [anim1, setAnim1] = useState(false);

  //   const { loading, error, data } = useQuery(GET_USERS);
  const query = useQuery(GET_USER, {
    variables: { name: "test" },
    pollInterval: 2000,
  });

  const [addTodo, mutation] = useMutation(ADD_TODO);

  const props1 = useSpring({
    scale: anim1 ? 1 : 0,
    config: { duration: 800, easing: easings.easeInOutQuint },
  });

  let navigate = useNavigate();

  const checkDisplay = (val) => {
    if (buttonState[1]) {
      if (val.completed) {
        return "none";
      }
    }
    if (buttonState[2]) {
      if (!val.completed) {
        return "none";
      }
    }
  };

  const Todo = ({ todo, index, reload }) => {
    const [visible, setVisible] = useState(false);
    const [anim, setAnim] = useState(false);

    const props = useSpring({
      scale: anim ? 1 : 0,
      background: anim ? "red" : "green",
      config: { duration: 800, easing: easings.easeInOutQuint },
    });
    // useEffect(()=>{

    // },[firstLoadTodo])

    useEffect(() => {
      console.log("firstLoadTodo", firstLoadTodo);
      setTimeout(() => {
        setFirstLoadTodo(false);
      }, 1000);
      if (firstLoadTodo) {
        setAnim(true);
      }
    }, []);
    return (
      <animated.div
        key={index}
        style={{
          display: checkDisplay(todo),
          scale: firstLoadTodo ? props.scale : 1,
          //   background: props.background,
        }}
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
      >
        <List
          style={{
            width: "100%",
            bgcolor: "background.paper",
          }}
        >
          <ListItem
            style={
              {
                // textAlign:'center',
              }
            }
          >
            <Checkbox
              {...label}
              checked={todo.completed}
              onChange={() => {
                let temp = todos;
                temp[index].completed = !temp[index].completed;
                setTodos([...temp]);
                setTodoFetch(true);
              }}
            />
            <ListItemText
              primary={todo.name}
              style={{
                paddingLeft: "3%",
                textDecoration: todo.completed ? "line-through" : null,
                color: todo.completed ? "#696969" : "black",
              }}
            />
            <IconButton
              aria-label="toggle password visibility"
              edge="end"
              style={{ display: visible ? "flex" : "none" }}
              onClick={() => {
                let temp = todos.filter((t) => t.name !== todo.name);
                console.log(temp);
                setTodoFetch(true);
                setTodos(temp);
              }}
            >
              <Clear />
            </IconButton>
          </ListItem>
          <Divider />
        </List>
      </animated.div>
    );
  };

  useEffect(() => {
    let count = 0;
    todos.forEach((todo) => {
      if (!todo.completed) {
        count += 1;
      }
    });
    if (count === todos.length) {
      setClearCompleted(true);
    } else setClearCompleted(false);
    if (todoFetch) {
      addTodo({
        variables: { todo: JSON.stringify(todos) },
        onCompleted: () => setTodoFetch(false),
      });
      console.log("todoFetch", todoFetch);
    }
  }, [todos]);

  useEffect(() => {
    console.log("todoFetch", todoFetch);
    if (!query.loading) {
      setFirstLoad(false);
      setAnim1(true);
    }
  }, [query.loading]);

  useEffect(() => {
    if (query.data) {
      console.log(query.data);
      firstLoad && setTodos(JSON.parse(query.data.users[0].todos));
    }
  }, [query.data]);

  if (query.loading)
    return (
      <div
        style={{
          display: "flex",
          width: "100vw",
          background: "linear-gradient(to right top,ghostwhite,floralwhite)",
          height: "100vh",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress />
      </div>
    );
  else
    return (
      <div
        style={{
          background: "linear-gradient(to right top,ghostwhite,floralwhite)",
        }}
      >
        <animated.div
          style={{
            width: "100vw",
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            overflowY: "scroll",
            paddingBottom: "5%",
            scale: props1.scale,
          }}
        >
          <Typography
            style={{
              fontSize: "4rem",
              fontFamily: "gillsans",
              marginTop: "10%",
              color: "crimson",
            }}
          >
            TODOS
          </Typography>
          <FormControl sx={{ m: 1, width: "35vw" }} variant="filled">
            <InputLabel htmlFor="filled-adornment-password">
              What needs to be done?
            </InputLabel>
            <FilledInput
              id="filled-adornment-password"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  console.log("enter", e.target.value);
                  let temp = e.target.value;
                  setTodos((p) => [...p, { name: temp, completed: false }]);
                  setTodoFetch(true);
                  e.target.value = "";
                }
              }}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => {
                      let temp = todos;
                      let count = 0;
                      temp.forEach((t) => {
                        if (t.completed === true) {
                          count += 1;
                        }
                      });
                      console.log(count);
                      if (count === temp.length) {
                        temp.forEach((t) => {
                          t.completed = false;
                        });
                        setReload(!reload);
                        setTodoFetch(true);
                        setTodos([...temp]);
                        return;
                      }
                      temp.forEach((t) => {
                        t.completed = true;
                      });
                      console.log("after", count);
                      setReload(!reload);
                      setTodoFetch(true);
                      setTodos([...temp]);
                    }}
                    edge="end"
                  >
                    <KeyboardArrowDown />
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Paper
              elevation={3}
              style={{
                height: "auto",
                width: "35vw",
                marginTop: "2%",
                overflowY: "scroll",
              }}
            >
              {todos.map((todo, index) => (
                <Todo todo={todo} index={index} reload={reload} />
              ))}
              {todos.length > 0 ? (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-evenly",
                    paddingBottom: "2%",
                  }}
                >
                  <ThemeProvider theme={theme}>
                    <Typography
                      color="#696969"
                      sx={{ fontSize: ".7rem", paddingLeft: "2%" }}
                    >
                      {todos.length} {todos.length !== 1 ? "items" : "item"}{" "}
                      left
                    </Typography>

                    <ButtonGroup
                      variant="text"
                      aria-label="outlined primary button group"
                      color="primary"
                    >
                      <Button
                        sx={{
                          fontSize: ".7rem",
                          color: buttonState[0] ? "coral" : "primary",
                        }}
                        onClick={() => setButtonState([true, false, false])}
                      >
                        All
                      </Button>
                      <Button
                        sx={{
                          fontSize: ".7rem",
                          color: buttonState[1] ? "coral" : "primary",
                        }}
                        onClick={() => setButtonState([false, true, false])}
                      >
                        Active
                      </Button>
                      <Button
                        sx={{
                          fontSize: ".7rem",
                          color: buttonState[2] ? "coral" : "primary",
                        }}
                        onClick={() => setButtonState([false, false, true])}
                      >
                        Completed
                      </Button>
                    </ButtonGroup>
                    <Button
                      sx={{
                        fontSize: ".7rem",
                        color: "primary",
                      }}
                      disabled={clearCompleted}
                      onClick={() => {
                        let temp = todos.filter((todo) => !todo.completed);
                        console.log(temp);
                        setTodoFetch(true);
                        setTodos(temp);
                      }}
                    >
                      Clear Completed
                    </Button>
                  </ThemeProvider>
                </div>
              ) : null}
            </Paper>
          </Box>
        </animated.div>
      </div>
    );
}
