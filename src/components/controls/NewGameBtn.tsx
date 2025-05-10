interface Props {
  onClick: () => void;
}

const NewGameBtn = ({ onClick }: Props) => {
  return (
    <button role="button" onClick={onClick}>
      New Game
    </button>
  );
};

export default NewGameBtn;
