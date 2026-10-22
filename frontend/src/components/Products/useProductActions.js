import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { notifyShoppingChange } from "../utils/shoppingEvents";

export default function useProductActions() {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [wishlistIds, setWishlistIds] = useState(new Set());
  const [actionLoading, setActionLoading] = useState({ type: null, id: null });

  useEffect(() => {
    if (!isAuthenticated) {
      setWishlistIds(new Set());
      return;
    }

    let active = true;
    axios.get("/api/wishlist", { withCredentials: true })
      .then(({ data }) => {
        if (active) {
          setWishlistIds(new Set((data.wishlist?.products ?? []).map((product) => product._id)));
        }
      })
      .catch((error) => console.error("Error fetching wishlist:", error));

    return () => { active = false; };
  }, [isAuthenticated, user?._id]);

  const requireLogin = () => {
    if (isAuthenticated) return false;
    navigate("/login", { state: { from: location.pathname } });
    return true;
  };

  const handleWishlistClick = async (productId) => {
    if (requireLogin()) return;
    const isWishlisted = wishlistIds.has(productId);
    setActionLoading({ type: "wishlist", id: productId });

    try {
      if (isWishlisted) {
        await axios.delete(`/api/wishlist/remove/${productId}`, { withCredentials: true });
      } else {
        await axios.post("/api/wishlist/add", { productId }, { withCredentials: true });
      }
      setWishlistIds((currentIds) => {
        const updatedIds = new Set(currentIds);
        if (isWishlisted) updatedIds.delete(productId);
        else updatedIds.add(productId);
        return updatedIds;
      });
      notifyShoppingChange();
    } catch (error) {
      console.error("Error updating wishlist:", error.response?.data || error.message);
    } finally {
      setActionLoading({ type: null, id: null });
    }
  };

  const handleCartClick = (productId) => {
    navigate(`/product/${productId}`, { state: { promptForSize: true } });
  };

  return { wishlistIds, actionLoading, handleWishlistClick, handleCartClick };
}
