interface Props {
  onClick: () => void;
}

const NewGameBtn = ({ onClick }: Props) => {
  return (
    <button className="new-game-btn" role="button" onClick={onClick}>
      New Game
    </button>
  );
};

export default NewGameBtn;
