import {cleanup, render, screen} from "@testing-library/react";
import {type ComponentPropsWithRef, type FC, forwardRef} from "react";
import {afterEach, describe, expect, it, vi, test} from "vitest";
import {setup} from "../../tests/testUtils";

const Button: FC<ComponentPropsWithRef<"button">> = forwardRef((props, ref) => (
  <button ref={ref} {...props} role={'button'}>
    {props.children}
  </button>
));

describe('Button tests', async () => {

  afterEach(() => {
    cleanup();
  });

  test("Button, display children and function called", async () => {
    const mockFunction = vi.fn();
    const {user, getByRole} = setup(<Button onClick={mockFunction}>a</Button>);
    const target = screen.getByRole("button");
    expect(target).toHaveTextContent("a")
    await user.click(target);
    expect(mockFunction).toBeCalledTimes(1);
  });

  it("Button, display children and function called", async () => {
    const mockFunction = vi.fn();
    const {user, getByRole} = setup(<Button onClick={mockFunction}>b</Button>);
    const target = screen.getByRole("button");
    expect(target).toHaveTextContent("b")
    await user.dblClick(target);
    expect(mockFunction).toBeCalledTimes(2);
  });

})
