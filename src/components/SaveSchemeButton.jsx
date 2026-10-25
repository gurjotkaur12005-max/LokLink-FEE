import { useSelector, useDispatch } from "react-redux";
import { addSavedScheme, removeSavedScheme } from "../redux/savedSchemesSlice";

// Saves or removes a scheme using Redux Toolkit.
function SaveSchemeButton({ schemeId }) {
  const dispatch = useDispatch();
  // useSelector reads from the Redux store
  const isSaved = useSelector((state) => state.savedSchemes.ids.includes(schemeId));

  function handleClick() {
    if (isSaved) {
      dispatch(removeSavedScheme(schemeId));
    } else {
      dispatch(addSavedScheme(schemeId));
    }
  }

  return (
    <button
      type="button"
      className={isSaved ? "btn btn-saved" : "btn btn-outline"}
      onClick={handleClick}
      aria-pressed={isSaved}
    >
      {isSaved ? "✓ Saved · Remove" : "☆ Save scheme"}
    </button>
  );
}

export default SaveSchemeButton;
