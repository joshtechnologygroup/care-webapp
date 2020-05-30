import React from "react";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { Input } from "@material-ui/core";

export default function MultiSelectNumberDropdown({ onSelect, fieldName, field }) {
  const [renderValue, setRenderValue] = React.useState("");
  const [subDropdownValue, setSubDropDownValue] = React.useState("Equals To");
  const [fromValue, setFromValue] = React.useState("");
  const [toValue, setToValue] = React.useState("");
  const [open, setOpen] = React.useState(false);

  const handleSubDropdownChange = (event) => setSubDropDownValue(event.target.value);
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);
  const handleKeyDown = (e) => {
    if (e.which === 13) {
      // Enter key pressed
      let value = `${fieldName}: ${subDropdownValue} ${fromValue}`;

      let selectedValue = {
        field: field,
        type: subDropdownValue,
        fromValue: fromValue,
        toValue: toValue
      }
      if (subDropdownValue === 'Range') {
        value = value + ' - ' + toValue;
        selectedValue.toValue = toValue
      }
      setRenderValue(value);
      onSelect(selectedValue);
      handleClose();
    }
    e.stopPropagation(); // Prevent option search when typing into the InputBase
  };

  return (
    <div className="input-common">
      <FormControl>
        <Select
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value='default'
          renderValue={() => {
            if (!renderValue) {
              return <em>{fieldName}</em>;
            }
            return renderValue;
          }}
          displayEmpty
          inputProps={{ 'aria-label': 'Without label' }}
        >
          <MenuItem disabled value="default">
            <em>{fieldName}</em>
          </MenuItem>
          <MenuItem value="" onClick={handleOpen}>
            <div className="sub-dropdown">
              <FormControl>
                <Select
                  value={subDropdownValue}
                  onChange={handleSubDropdownChange}
                  inputProps={{ 'aria-label': 'Without label' }}
                >
                  <MenuItem value="Equals To">
                    Equals to
                  </MenuItem>
                  <MenuItem value="Less Than">
                    Less Than
                  </MenuItem>
                  <MenuItem value="Greater Than">
                    Greater Than
                  </MenuItem>
                  <MenuItem value="Range">
                    Range
                  </MenuItem>
                </Select>
              </FormControl>
            </div>
          </MenuItem>
          <MenuItem value="" onClick={handleOpen}>
            <Input
              fullWidth
              value={fromValue}
              onChange={(e) => setFromValue(e.currentTarget.value)}
              onKeyDown={handleKeyDown}
              placeholder={`Enter ${subDropdownValue}`}
            />
          </MenuItem>
          {subDropdownValue === 'Range' ?
            <MenuItem value="" onClick={handleOpen}>
              <Input
                fullWidth
                name="to"
                value={toValue}
                onChange={(e) => setToValue(e.currentTarget.value)}
                onKeyDown={handleKeyDown}
                placeholder="To"
              />
            </MenuItem> : null}
        </Select>
      </FormControl>
    </div>
  );
}
