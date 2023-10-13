import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

export default function SortMenu() {
  const MENU_LIST = ["関連度順", "新着順", "高単価順"] as const;
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [selectedOption, setSelectedOption] = React.useState<string>(
    MENU_LIST[0]
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (option: string) => {
    setSelectedOption(option); // 選択した選択肢にテキストを更新
    setAnchorEl(null); // メニューを閉じる
  };

  return (
    <div>
      <Button
        id="sort-button"
        aria-controls={open ? "sort-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon />}
        variant="text"
      >
        {selectedOption}
      </Button>
      <Menu
        id="sort-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "sort-button",
        }}
      >
        {MENU_LIST.map((menu) => (
          <MenuItem key={menu} onClick={() => handleMenuItemClick(menu)}>
            {menu}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
