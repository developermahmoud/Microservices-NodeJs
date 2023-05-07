import { listOfServices } from "../config/services.js";

export const checkIfServiceFoundOrNot = (name) => {
  const services = listOfServices;
  let service;
  services.forEach((element) => {
    if(element.name == name) {
      service = element
      return
    }
  });
  return service
};
