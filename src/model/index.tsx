class dataOfReminder {
  data: any = [];
}
class editDataModel {
editData: any = [];
}

class ReducersModel {
  homePageReducer: dataOfReminder = new dataOfReminder();
  editReducer: editDataModel = new editDataModel();
}

export { dataOfReminder, ReducersModel, editDataModel };
