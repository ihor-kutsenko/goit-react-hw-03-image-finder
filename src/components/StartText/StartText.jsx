import css from './StartText.module.css';

const StartText = () => {
  return (
    <div className={css.wrapper}>
      <p className={css.text}>"Welcome to the image search site!</p>
      <p className={css.text}>
        Here you can find incredible images that will lift your mood and help
        realize your creative ideas.
      </p>
      <p className={css.text}>
        Let's start together: Enter a keyword related to what you want to find.
        For example, "nature", "cat", "car".
      </p>
      <p className={css.text}>
        Click the "Search" button and the system will find for you the best
        pictures that match your request.
      </p>
    </div>
  );
};

export default StartText;
