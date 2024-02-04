const Form = () => {
  return (
    <form>
      <label>Keep travelling all year round!</label>
      <p>
        Subscribe to our newsletter to find travel inspiration in your inbox.
      </p>
      <div className="form-item">
        <input type="text" placeholder="Full Name" />
        <input type="email" placeholder="Email ID" />
        <input type="text" placeholder="Phone No" />
        <button type="submit">Subscribe</button>
      </div>
    </form>
  );
};

export default Form;
