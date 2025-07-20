/* eslint-disable react/prop-types */
import Button from "../../../ui/Button";
import Input from "../../../ui/Input";
import Select from "../../../ui/Select";

const BasicInformation = ({
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
  setCurrentTab,
}) => {
  return (
    <>
      <div className="p-8 border-b">
        <h3>Basic Information</h3>
      </div>
      {/* Form Content */}
      <div className="p-8">
        <div className="row">
          {/* Title */}
          <div>
            <Input
              id="title"
              label="Title"
              placeholder="Your Course Title"
              required
              type="text"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.title}
            />
            <p className="text-xs text-red-400 font-bold mt-2">
              {errors.title && touched.title && errors.title}
            </p>
          </div>
        </div>
        <div className="row mt-4">
          {/* Summary */}
          <div>
            <Input
              id="summary"
              label="Summary"
              placeholder="Your Course summary"
              required
              type="text"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.summary}
            />
            <p className="text-xs text-red-400 font-bold mt-2">
              {errors.summary && touched.summary && errors.summary}
            </p>
          </div>
        </div>
        <div className="row mt-4">
          {/* Price */}
          <div>
            <Input
              id="price"
              label="Price"
              placeholder="Your Course Price"
              required
              type="number"
              min={0}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.price}
            />
            <p className="text-xs text-red-400 font-bold mt-2">
              {errors.price && touched.price && errors.price}
            </p>
          </div>
          <div>
            <Input
              id="discount"
              label="Discount"
              placeholder="Your Course Discounted Price"
              required
              type="number"
              min={0}
              max={values.price}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.discount}
            />
            <p className="text-xs text-red-400 font-bold mt-2">
              {errors.discount && touched.discount && errors.discount}
            </p>
          </div>
        </div>
        <div className="row mt-4">
          {/* Discount Expires */}
          <div>
            <Input
              id="discountExpires"
              label="Discount Expires"
              required
              type="date"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.discountExpires}
            />
            <p className="text-xs text-red-400 font-bold mt-2">
              {errors.discountExpires &&
                touched.discountExpires &&
                errors.discountExpires}
            </p>
          </div>
        </div>
        {/* Button */}
        <div className="mt-4">
          <Button
            title="Save & Next"
            secondary
            type="button"
            onClick={() => setCurrentTab("advance")}
          />
        </div>
      </div>
    </>
  );
};
export default BasicInformation;
