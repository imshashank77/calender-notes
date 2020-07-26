import { dataOfReminder,editDataModel } from "../../model";
export const homePageReducer = (
  state: dataOfReminder = new dataOfReminder(),
  action: any
) => {
  switch (action.type) {
    case "updateData":
      return { data: [...action.payload] };
    default:
      return state;
  }
};
export const editReducer = (
  state: editDataModel = new editDataModel(),
  action: any
) => {
  switch (action.type) {
    case "editData":
      return { editData: [...action.payload] };
    default:
      return state;
  }
};
