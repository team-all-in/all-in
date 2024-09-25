export default function Names({
  server_name,
  channel_name,
  sender_name,
}: {
  server_name: string;
  channel_name: string;
  sender_name: string;
}) {
  return (
    <div className='flex flex-col'>
      {server_name && (
        <p className='fonts text-xs'>
          {server_name}
          <span className='mx-1'>/</span>#{channel_name}
        </p>
      )}
      <h4 className='font-bold'>{sender_name}</h4>
    </div>
  );
}
