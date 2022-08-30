import { Component, Input } from '@angular/core';

// providers
import { CurrencyProvider } from '../../providers/currency/currency';
@Component({
  selector: 'wallet-item-content',
  templateUrl: 'wallet-item-content.html'
})
export class WalletItemContent {
  @Input()
  wallet: any;

  @Input()
  useFadeEffect?: boolean;

  @Input()
  context?: string;

  constructor(public currencyProvider: CurrencyProvider) {}

  get notSupported() {
    return this.context === 'topup' && ['xrp'].includes(this.wallet.coin);
  }

  getBalance(wallet, currency) {
    const lastKnownBalance = this.getLastKownBalance(wallet, currency);
    if (currency === 'XRP') {
      const availableBalanceStr =
        wallet.cachedStatus &&
        wallet.cachedStatus.availableBalanceStr &&
        wallet.cachedStatus.availableBalanceStr.replace(` ${currency}`, '');
      return availableBalanceStr || lastKnownBalance;
    } else {
      const totalBalanceStr =
        wallet.cachedStatus &&
        wallet.cachedStatus.totalBalanceStr &&
        wallet.cachedStatus.totalBalanceStr.replace(` ${currency}`, '');

      // New created wallet does not have "lastkKnownBalance"
      if (
        totalBalanceStr == '0.00' &&
        (lastKnownBalance == '0.00' || !lastKnownBalance)
      )
        return '0';
      return totalBalanceStr || lastKnownBalance;
    }
  }

  getAlternativeBalance(wallet, currency) {
    if (currency === 'XRP') {
      const availableAlternative =
        wallet.cachedStatus && wallet.cachedStatus.availableBalanceAlternative;
      return availableAlternative;
    } else {
      const totalBalanceAlternative =
        wallet.cachedStatus && wallet.cachedStatus.totalBalanceAlternative;
      if (totalBalanceAlternative == '0.00') return '0';
      return totalBalanceAlternative;
    }
  }

  getLastKownBalance(wallet, currency) {
    return (
      wallet.lastKnownBalance &&
      wallet.lastKnownBalance.replace(` ${currency}`, '')
    );
  }
}
