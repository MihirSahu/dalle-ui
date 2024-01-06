import { useState } from 'react';
import { Combobox, Input, InputBase, useCombobox, createTheme, MantineProvider } from '@mantine/core';
import Dropdown from '../../public/dropdown.svg';
import { Lexend } from 'next/font/google'

const groceries = [
  'DALL-E 2',
  'DALL-E 3',
];

const lexend = Lexend({ subsets: ['latin'], weight: ["600"] })

const ModelSelect = () => {
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const [value, setValue] = useState<string | null>(null);

  const options = groceries.map((item) => (
    <Combobox.Option value={item} key={item}>
      {item}
    </Combobox.Option>
  ));

  return (
    <Combobox
      styles={{
        dropdown: {
          backgroundColor: '#FEF3F3',
          border: 'none',
        },
      }}
      store={combobox}
      withinPortal={false}
      onOptionSubmit={(val) => {
        setValue(val);
        combobox.closeDropdown();
      }}
    >
      <Combobox.Target>
        <InputBase
          component="button"
          type="button"
          pointer
          rightSection={<Dropdown />}
          onClick={() => combobox.toggleDropdown()}
          rightSectionPointerEvents="none"
          className={`${lexend.className} drop-shadow-lg`}
          styles={{
            input: {
              border: 'none',
              backgroundColor: '#FEF3F3',
              width: '8rem',
              height: '3.2rem',
              textAlign: 'center',
              fontWeight: '600',
            },
          }}
        >
          {value || <Input.Placeholder
            style={{
              whiteSpace: 'nowrap',
            }}
          >Select model</Input.Placeholder>}
        </InputBase>
      </Combobox.Target>

      <Combobox.Dropdown>
        <Combobox.Options>{options}</Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
}

export default ModelSelect;