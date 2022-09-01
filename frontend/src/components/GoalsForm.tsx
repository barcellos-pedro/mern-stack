function GoalsForm() {
  return (
    <form className="form">
      <div className="form-group">
        <label htmlFor="text">Goal</label>
        <input type="text" name="text" id="text" required={true} />
      </div>

      <button className="btn btn-block" type="submit">
        Add Goal
      </button>
    </form>
  );
}

export default GoalsForm;
