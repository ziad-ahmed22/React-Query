import { Axios } from "./../api/Axios";
import { useQuery } from "react-query";

const userFetcherByEmailId = async (email) => {
  return await Axios.get(`/users/${email}`);
};

const coursesFetcherByChannel = async (channel) => {
  return await Axios.get(`/channels/${channel}`);
};

export const Dependent = ({ email }) => {
  const { data: user } = useQuery(["users", email], () =>
    userFetcherByEmailId(email)
  );

  const channelId = user?.data?.channelId;

  const { data: channel } = useQuery(
    ["channels", channelId],
    () => coursesFetcherByChannel(channelId),
    {
      enabled: !!channelId,
    }
  );

  return (
    <>
      <p>Id: {user?.data?.id}</p>
      <p>Channels: {channel?.data?.courses}</p>
    </>
  );
};
