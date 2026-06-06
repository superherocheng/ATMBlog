## Introduction

Modern portfolio theory, introduced by Harry Markowitz in 1952, provides a mathematical framework for constructing investment portfolios that maximize expected return for a given level of risk.

## Expected Return and Risk

Portfolio expected return is the weighted average of individual asset returns. Portfolio risk (variance) depends not only on individual asset variances but also on the covariances between assets — this is the key insight that makes diversification valuable.

### The Efficient Frontier

The efficient frontier represents the set of portfolios that offer the highest expected return for each level of risk. Portfolios below the frontier are suboptimal — they offer lower return for the same risk.

## Python Implementation

In Python, mean-variance optimization can be implemented using libraries like NumPy for matrix operations and SciPy for constrained optimization. The key steps are: estimate expected returns, compute the covariance matrix, and solve for optimal portfolio weights.

```python
import numpy as np
from scipy.optimize import minimize

def efficient_portfolio(returns, cov_matrix, target_return):
    n = len(returns)
    args = (returns, cov_matrix, target_return)
    constraints = ({'type': 'eq', 'fun': lambda w, r, c, t: w.sum() - 1},
                   {'type': 'eq', 'fun': lambda w, r, c, t: r @ w - t})
    bounds = [(0, 1)] * n
    result = minimize(lambda w, r, c, t: w @ c @ w,
                      np.ones(n) / n, args=args,
                      constraints=constraints, bounds=bounds)
    return result.x
```

## Conclusion

Mean-variance optimization remains a cornerstone of portfolio construction. While it has limitations — sensitivity to input estimates, assumption of normal returns — it provides a rigorous framework for thinking about the risk-return tradeoff.
