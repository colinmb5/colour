import React from "react";
import Button from "@mui/material/Button";
import { ChromePicker } from "react-color";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";

function ColorPickerForm(props) {
  const [curColor, setColor] = React.useState("teal");
  const { paletteFull, colors, colorName, setColorName } = props;

  React.useEffect(() => {
    ValidatorForm.addValidationRule("isColorNameUnique", (value) => {
      return colors.every(
        ({ name }) => name.toLowerCase() !== value.toLowerCase()
      );
    });
    ValidatorForm.addValidationRule("isColorUnique", (value) => {
      return colors.every(
        ({ color }) => color.toLowerCase() !== curColor.toLowerCase()
      );
    });
  });

  const updateCurrentColor = (newColor) => {
    setColor(newColor.hex);
  };
  const handleColorChange = (evt) => {
    setColorName(evt.target.value);
  };
  const handleSubmit = () => {
    const newColor = { color: curColor, name: colorName };
    props.addNewColor(newColor);
    setColorName("");
  };

  return (
    <div>
      <ChromePicker color={curColor} onChangeComplete={updateCurrentColor} />
      <ValidatorForm onSubmit={handleSubmit}>
        <TextValidator
          value={colorName}
          onChange={handleColorChange}
          validators={["required", "isColorNameUnique", "isColorUnique"]}
          errorMessages={[
            "This field is required!",
            "Color name must be unique!",
            "Color already use!",
          ]}
        />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          disabled={paletteFull}
          style={{ backgroundColor: paletteFull ? "grey" : curColor }}
        >
          {paletteFull ? "Palette Full" : "Add Color"}
        </Button>
      </ValidatorForm>
    </div>
  );
}

export default ColorPickerForm;
