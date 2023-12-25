import { BOOKMARK_MENU_LIST, jobBookmarkSortAtom } from "@/atoms/atoms";
import { Button, Menu, MenuItem } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import React from "react";
import { useAtom } from "jotai";

const SortMenu = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [sortOption, setSortOption] = useAtom(jobBookmarkSortAtom);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleMenuItemClick = async (
    option: (typeof BOOKMARK_MENU_LIST)[number]
  ) => {
    setSortOption(option); // 選択した選択肢にテキストを更新
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
        {sortOption}
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
        {BOOKMARK_MENU_LIST.map((menu) => (
          <MenuItem key={menu} onClick={() => handleMenuItemClick(menu)}>
            {menu}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};
export default SortMenu;
