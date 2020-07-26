import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { ReducersModel } from "../../model";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { useCookies } from "react-cookie";

// @ts-ignore
import Calendar from "react-calendar";
// @ts-ignore
import "react-calendar/dist/Calendar.css";
import InputField from "./inputField";

const styles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: "flex",
      fontFamily: "Helvetica Neue",
      [theme.breakpoints.down("sm")]:{
        flexDirection: "column"
      }
    },
    calender:{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    rightContainer: {
      flex: 1,
      [theme.breakpoints.down("sm")]:{
        width: "95%",
        margin: "0 auto"
      }
    },
    reminderForm: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
      '& button':{
        margin: 15,
        outline: "none",
        background: "black",
        borderRadius: 5,
        padding: "7px 9px",
        color: "white",
        cursor: "pointer",

      }
    },
    leftContainer: {
      display: "flex",
      justifyContent: "center",
      alignSelf: "flex-start",
      flex: 1,
      flexDirection: "column",
      "& h1": {
        fontSize: 18,
        fontFamily: "Helvetica Neue",
      },
    },
    list: {
      "& h1": {},
      "& h6": {},
    },
    box: {
      border: "1px solid #ccc",
      boxShadow:
        "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
      marginTop: 20,
      width: 300,
      height: 138,
      paddingBottom: 20,
      position: "relative",
      "& h1": {
        fontSize: 21,
        marginBottom: 10,
      },
      "& h6": {
        fontSize: 14,
        margin: "10px 0",
      },
    },
    delete: {
      position: "absolute",
      top: 10,
      right: 15,
      cursor: "pointer",
    },
    modal: {
      display: "flex",
      alignItems: "center",
      // background: "red",
      justifyContent: "center",
    },
    firstBox: {
      background: "lightgreen",
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: "2px solid #000",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
    date: {
      color: "red",
    },
    edit: {
      background: "lightblue",
      // padding: "10px 15px",
      position: "absolute",
      right: 20,
      width: 40,
      height: 30,
      borderRadius: 5,
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    done:{
      margin: 10,
    }
  })
);
export default function Index() {
  const dispatch = useDispatch();
  const [cookies, setCookie] = useCookies(["reminderData"]);
  const [editOpen, setEditOpen] = React.useState(false);
  // const [cookies, setCookie] = useCookies(["togal"]);

  const [open, setOpen] = React.useState(false);
  const [index, setIndex] = React.useState(0);
  const handleOpen = (i: any) => {
    setOpen(true);
    setIndex(i);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const [date1, setDate] = React.useState({
    date: new Date(),
  });
  // const [editData, setEditData] = React.useState([])
  const [togal, setTogal] = React.useState(false);
  let [valueOfInput, setValueOfInput]: any = React.useState({
    key: date1.date.setHours(0, 0, 0, 0).valueOf(),
    title: "",
    description: "",
  });
  const { data } = useSelector((state: ReducersModel) => state.homePageReducer);
  const { editData } = useSelector((state: ReducersModel) => state.editReducer);

  const onChange = (date: any) => {
    // console.log(date1.date, "date");
    setDate({ date });
    if (data.length > 0) {
      for (let i = 0; i < data.length; i++) {
        if (data[i].key === date.getTime()) {
          setTogal(false);

          let sortData = data;
          let firstIndexData = {};
          firstIndexData = sortData[i];
          sortData[i] = sortData[0];
          sortData[0] = firstIndexData;
          dispatch({ type: "updateData", payload: [...sortData] });
          setCookie("reminderData", [...sortData]);

          return;
        } else {
          setTogal(true);
          setValueOfInput({ ...valueOfInput, key: date.getTime() });
        }
      }
    } else {
      setTogal(true);
      setValueOfInput({ ...valueOfInput, key: date.getTime() });
    }
  };
  // console.log(valueOfInput);
  // console.log(data);
  const classes = styles();
  const onChangeInput = (e: any, key: string) => {
    // console.log(e.target.value);
    setValueOfInput({ ...valueOfInput, [key]: e.target.value });
  };
  const submitData = () => {
    let arrayOfData = [valueOfInput, ...data];
    dispatch({ type: "updateData", payload: [...arrayOfData] });
    setCookie("reminderData", [...arrayOfData]);
    setValueOfInput({ title: "", description: "" });
    setTogal(false);
  };
  const deleteList = (key: any) => {
    let mainList = [];
    mainList = data.filter((item: any) => item.key !== key);
    dispatch({ type: "updateData", payload: [...mainList] });
    setCookie("reminderData", [...mainList]);

    // setTogal(true);
  };

  const edit = (key: any) => {
    setEditOpen(true);
    let mainList = [];
    mainList = data.filter((item: any) => item.key === key);
    dispatch({ type: "editData", payload: [...mainList] });
    console.log(editData, "hello");
  };
  const onChangeInputEdit = (e: any, key: any) => {
    dispatch({
      type: "editData",
      payload: [{ ...editData[0], [key]: e.target.value }],
    });
  };
  const editSubmit = () => {
    let updatedData = [];
    updatedData = data.filter((item: any) => item.key !== editData[0].key);
    dispatch({ type: "updateData", payload: [...editData, ...updatedData] });
    setCookie("reminderData", [...editData, ...updatedData]);

    dispatch({ type: "editData", payload: [] });
    setEditOpen(false);
  };

  React.useEffect(() => {
    cookies.reminderData &&
      dispatch({ type: "updateData", payload: [...cookies.reminderData]});
  }, []);
  // console.log(cookies.reminderData, "cookis");
  const handleCloseform = () =>{
    setEditOpen(false);
  }
  return (
    <div className={classes.container}>
      <div className={classes.leftContainer}>
        <div className = {classes.calender}>
          <Calendar onChange={onChange} value={date1.date} />
        </div>
        {togal ? (
          <div className={classes.reminderForm}>
            <InputField
              placeholder="title"
              name="title"
              value={valueOfInput.title}
              onChangeInput={onChangeInput}
            />
            <InputField
              placeholder="description"
              name="description"
              value={valueOfInput.description}
              onChangeInput={onChangeInput}
            />
            <button onClick={submitData}>Submit</button>
          </div>
        ) : (
          <h1>Hello you have already create a notes for that day</h1>
        )}
      </div>
      <div className={classes.rightContainer}>
        {cookies.reminderData &&
          cookies.reminderData.length > 0 &&
          cookies.reminderData.map((item: any, i: any) => (
            <>
              {i === 0 ? (
                <div
                  key={item.key}
                  className={`${classes.box} ${classes.firstBox}`}
                >
                  <div onClick={() => handleOpen(i)} className={classes.list}>
                    <h1>Title: {item.title}</h1>
                    <h6> Description:- {item.description}</h6>

                    <div className={classes.date}>
                      {new Intl.DateTimeFormat("en-US", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                      }).format(item.key)}
                      {/* {item.key} */}
                    </div>
                  </div>
                  <div
                    className={classes.delete}
                    onClick={() => deleteList(item.key)}
                  >
                    <DeleteOutlineIcon />
                  </div>
                  <div onClick={() => edit(item.key)} className={classes.edit}>
                    Edit
                  </div>
                </div>
              ) : (
                <div key={item.key} className={classes.box}>
                  <div onClick={() => handleOpen(i)} className={classes.list}>
                    <h1>Title: {item.title}</h1>
                    <h6> Description:- {item.description}</h6>

                    <div>
                      {new Intl.DateTimeFormat("en-US", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                      }).format(item.key)}
                      {/* {item.key} */}
                    </div>
                  </div>
                  <div
                    className={classes.delete}
                    onClick={() => deleteList(item.key)}
                  >
                    <DeleteOutlineIcon />
                  </div>
                  <div onClick={() => edit(item.key)} className={classes.edit}>
                    Edit
                  </div>
                </div>
              )}
            </>
          ))}
      </div>
     
      <>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={editOpen}
          onClose={handleCloseform}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={editOpen}>
            <div className={classes.paper}>
              {editData && editData.length > 0 && (
                <>
                  <InputField
                    placeholder="title"
                    name="title"
                    value={editData[0].title}
                    onChangeInput={onChangeInputEdit}
                  />
                  <InputField
                    placeholder="description"
                    name="description"
                    value={editData[0].description}
                    onChangeInput={onChangeInputEdit}
                  />
                  <button onClick={editSubmit} className = {classes.done}>Done</button>{" "}
                  <button onClick={handleCloseform}>close</button>
                </>
              )}
            </div>
          </Fade>
        </Modal>
      </>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h1>
              {cookies.reminderData &&
                cookies.reminderData.length &&
                cookies.reminderData[index].title}
            </h1>
            <p>{data && data.length && data[index].description}</p>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
