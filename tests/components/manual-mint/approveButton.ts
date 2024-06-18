import { type Page, expect } from '@playwright/test'

export default function (page: Page, tokenSymbol = '') {
  const dataTestId = `approve-${tokenSymbol.toLowerCase()}`

  const isVisible = async () => {
    const button = page.getByTestId(dataTestId)
    await expect(button).toBeVisible()
  }

  const click = async () => {
    const button = page.getByTestId(dataTestId)
    await button.click()
  }

  return { isVisible, click }
}
