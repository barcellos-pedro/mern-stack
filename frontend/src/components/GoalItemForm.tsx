type GoalItemFormProps = {
  onSubmitForm: (event: any) => void;
  onInputChange: (event: any) => void;
  value: string;
};

function GoalItemForm({
  onSubmitForm,
  onInputChange,
  value,
}: GoalItemFormProps) {
  return (
    <form className="form" onSubmit={onSubmitForm}>
      <div className="form-group">
        <input
          id="text"
          name="text"
          type="text"
          placeholder="Update your goal 📝"
          required={true}
          value={value}
          onChange={onInputChange}
        />
      </div>

      <button className="btn btn-block" type="submit">
        Update
      </button>
    </form>
  );
}

export default GoalItemForm;
