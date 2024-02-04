const Form = () => {
  return (
    <form>
      <input type="text" placeholder="Full Name" />
      <input type="email" placeholder="Email" />
      <textarea placeholder="Message" rows={5} />
      <button type="submit">Submit</button>
    </form>
  );
};

export default Form;
