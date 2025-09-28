
export const adminMiddleware = (req, res, next) => {
  const user = req.user;

  if (user && user.user_metadata?.role === 'admin') {
    return next();
  }

  res.status(403).json({ message: 'Forbidden: Access is restricted to administrators.' });
};