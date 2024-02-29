import { mock } from "@/api/client/axios";
import { GetUserResponse } from "../user/getUser";

const response: GetUserResponse = {
  name: "Bob",
  uuid: "1234",
  icon: {
    uuid: "1234",
    link: "https://github.com/shadcn.png",
  },
  description: "I am Bob",
  joinDate: "2021-01-01T00:00:00.000Z",
  chatServers: ["1234", "5678"],
};

//Matcher for /user/${request} where request is a string
const url = new RegExp(/\/user\/\w+/);
mock.onGet(url).reply(() => [200, response]);
