import { Field, Form, Formik } from "formik";
import s from "./SearchBar.module.css"
const SearchBar = ({onSubmit}) => {
  return (
    <header className={s.header}>
      <Formik
        initialValues={{
          search: "",
        }}
        onSubmit={onSubmit}
      >
        <Form className={s.form}>
          <Field name="search" className={s.found} placeholder="Search images..." />
          <button type="submit" className={s.btn}>Search</button>
        </Form>
      </Formik>
    </header>
  );
};

export default SearchBar;
