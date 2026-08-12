import { describe, expect, it } from "vitest";
import { formatPrice } from "./format-price";

describe("formatPrice", () => {
  it("formata valores em reais para o catálogo", () => {
    expect(formatPrice(1250000)).toBe("R$ 1.250.000");
  });
});
