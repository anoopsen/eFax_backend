import DocumentsObject from "../../doa/efax.js";

const RoleServices = () => {
  const CreateDocument = (data, cb) => {
    DocumentsObject.getUsers(data, (err, data, message) => {
      cb({ err, data, message });
    });
  };

  return {
    CreateDocument,
  };
};

export default RoleServices();
