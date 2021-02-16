import $ from "jquery";

import { getProvinces } from "../util/getProvinces";

getProvinces().then((data) => {
  console.log(data);
});
