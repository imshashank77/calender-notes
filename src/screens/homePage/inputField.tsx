import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core";

const styles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      width: 300,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      '& input':{
        width: "90%",
        padding: "10px 7px",
        marginTop: 15,
      }
    },
  })
);
export default function InputField(props: any) {
  const classes = styles();
  return (
    <div className={classes.container}>
      <input
        type={"text"}
        placeholder={props.placeholder}
        name={props.name}
        onChange={(e) => props.onChangeInput(e, props.name)}
        value={props.value}
      />
    </div>
  );
}
