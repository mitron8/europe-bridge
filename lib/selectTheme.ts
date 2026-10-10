import type { StylesConfig } from 'react-select';

export const getReactSelectStyles = (isDarkMode: boolean): StylesConfig<any, any> => ({
  control: (provided, state) => ({
    ...provided,
    borderRadius: '0.75rem',
    border: isDarkMode
      ? (state.isFocused ? '1px solid #E25260' : '1px solid #1A2130')
      : (state.isFocused ? '1px solid #D8434F' : '1px solid #EBE7E0'),
    boxShadow: state.isFocused
      ? (isDarkMode ? '0 0 0 2px rgba(226, 82, 96, 0.25)' : '0 0 0 2px rgba(216, 67, 79, 0.15)')
      : (isDarkMode ? 'none' : '4px 4px 0px 0px rgba(0,0,0,0.06)'),
    padding: '0.15rem',
    fontSize: '0.75rem',
    fontWeight: '700',
    backgroundColor: isDarkMode ? '#0A0D14' : '#ffffff',
    color: isDarkMode ? '#F8FAFC' : '#1E293B',
    cursor: 'pointer',
    minHeight: '38px',
    transition: 'all 0.15s ease',
    '&:hover': {
      borderColor: isDarkMode ? '#2E3A50' : '#CBD5E1',
    },
  }),
  valueContainer: (provided) => ({
    ...provided,
    padding: '2px 8px',
  }),
  singleValue: (provided) => ({
    ...provided,
    color: isDarkMode ? '#F8FAFC' : '#1E293B',
    fontWeight: '700',
    fontSize: '0.75rem',
  }),
  input: (provided) => ({
    ...provided,
    color: isDarkMode ? '#FFFFFF' : '#1E293B',
    fontWeight: '700',
    fontSize: '0.75rem',
    margin: 0,
    padding: 0,
  }),
  placeholder: (provided) => ({
    ...provided,
    color: isDarkMode ? '#94A3B8' : '#9CA3AF',
    fontWeight: '500',
    fontSize: '0.75rem',
  }),
  menu: (provided) => ({
    ...provided,
    backgroundColor: isDarkMode ? '#111622' : '#ffffff',
    border: isDarkMode ? '1px solid #1A2130' : '1px solid #EBE7E0',
    borderRadius: '0.75rem',
    boxShadow: isDarkMode
      ? '0 12px 30px rgba(0, 0, 0, 0.75), 0 4px 10px rgba(0, 0, 0, 0.5)'
      : '0 12px 30px rgba(0, 0, 0, 0.1), 0 4px 10px rgba(0, 0, 0, 0.05)',
    zIndex: 9999,
    overflow: 'hidden',
    padding: '4px',
  }),
  menuList: (provided) => ({
    ...provided,
    backgroundColor: isDarkMode ? '#111622' : '#ffffff',
    padding: '2px',
    maxHeight: '220px',
  }),
  option: (provided, state) => ({
    ...provided,
    fontSize: '0.75rem',
    fontWeight: '700',
    cursor: 'pointer',
    borderRadius: '0.5rem',
    margin: '1px 0',
    padding: '8px 12px',
    backgroundColor: state.isSelected
      ? (isDarkMode ? '#E25260' : '#FF4F4F')
      : state.isFocused
      ? (isDarkMode ? 'rgba(255, 255, 255, 0.08)' : '#fde8e8')
      : 'transparent',
    color: state.isSelected
      ? '#ffffff'
      : (isDarkMode ? '#F8FAFC' : '#1e1e1e'),
    '&:active': {
      backgroundColor: isDarkMode ? '#CF3F4D' : '#D8434F',
      color: '#ffffff',
    },
  }),
  multiValue: (provided) => ({
    ...provided,
    backgroundColor: isDarkMode ? '#1A2130' : '#F1EFEA',
    borderRadius: '0.5rem',
    border: isDarkMode ? '1px solid #222B3D' : '1px solid #E4E2DC',
  }),
  multiValueLabel: (provided) => ({
    ...provided,
    color: isDarkMode ? '#F8FAFC' : '#1E293B',
    fontSize: '0.75rem',
    fontWeight: '700',
    padding: '2px 6px',
  }),
  multiValueRemove: (provided) => ({
    ...provided,
    color: isDarkMode ? '#94A3B8' : '#868E96',
    borderRadius: '0 0.5rem 0.5rem 0',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: isDarkMode ? 'rgba(226, 82, 96, 0.25)' : '#FEE2E2',
      color: isDarkMode ? '#FF6B7A' : '#D8434F',
    },
  }),
  dropdownIndicator: (provided, state) => ({
    ...provided,
    color: isDarkMode ? '#94A3B8' : '#9CA3AF',
    padding: '4px',
    transform: state.selectProps.menuIsOpen ? 'rotate(180deg)' : 'rotate(0deg)',
    transition: 'transform 0.2s ease',
    '&:hover': {
      color: isDarkMode ? '#FFFFFF' : '#1E293B',
    },
  }),
  clearIndicator: (provided) => ({
    ...provided,
    color: isDarkMode ? '#94A3B8' : '#9CA3AF',
    padding: '4px',
    cursor: 'pointer',
    '&:hover': {
      color: isDarkMode ? '#FF6B7A' : '#D8434F',
    },
  }),
  indicatorSeparator: (provided) => ({
    ...provided,
    backgroundColor: isDarkMode ? '#1A2130' : '#EBE7E0',
    margin: '6px 0',
  }),
  noOptionsMessage: (provided) => ({
    ...provided,
    color: isDarkMode ? '#94A3B8' : '#9CA3AF',
    fontSize: '0.75rem',
    fontWeight: '600',
  }),
  loadingMessage: (provided) => ({
    ...provided,
    color: isDarkMode ? '#94A3B8' : '#9CA3AF',
    fontSize: '0.75rem',
    fontWeight: '600',
  }),
});
