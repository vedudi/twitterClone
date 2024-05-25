const Content = ({ tweet }) => {
  return (
    <div>
      {tweet.textContent && <p>{tweet.textContent}</p>}
      {tweet.imageContent && (
        <img
          className="my-2 w-full rounded-lg object-cover max-h[400px]"
          src={tweet.imageContent}
        />
      )}
    </div>
  );
};

export default Content;
