import "./pageLoading.scss";

const PageLoading = () => {
  return (
    <section id="PageLoading">
      <div className="loader-container">
        <div className="dot" />
        <div className="dot" />
        <div className="dot" />
      </div>
      <p>LOADING</p>
    </section>
  );
};

export default PageLoading;
