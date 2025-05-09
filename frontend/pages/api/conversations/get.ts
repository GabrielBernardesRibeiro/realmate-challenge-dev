import api from "@/_services/api";
import type { NextApiRequest, NextApiResponse } from "next";

const handle = async (req: NextApiRequest, res: NextApiResponse) => {
  const request = await api({
    endpoint: "/conversations",
    method: "GET",
  });

  return res.status(request.status).json(request.data);
};

export default handle;
