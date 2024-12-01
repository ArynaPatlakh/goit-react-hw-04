import { Field, Form, Formik } from "formik";

const SearchBar = ({onSubmit}) => {
  return (
    <header>
      <Formik
        initialValues={{
          search: "",
        }}
        onSubmit={onSubmit}
      >
        <Form>
          <Field name="search" />
          <button type="submit">Search</button>
        </Form>
      </Formik>
    </header>
  );
};

export default SearchBar;
