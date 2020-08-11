/**
 *  @swagger
 *  definitions:
 *    Products:
 *      type: object
 *      properties:
 *        name:
 *          type: string
 *        bar_code:
 *          type: string
 *        internal_code:
 *          type: string
 *        description:
 *          type: string
 *        cost_price:
 *         type: decimal
 *        sell_price:
 *         type: decimal
 *        to_sell:
 *          type: boolean
 *        show_online:
 *          type: boolean
 *        fraction_sell:
 *          type: boolean
 *      required:
 *        - name
 *        - cost_price
 *        - sell_price
 *        - to_sell
 *        - show_online
 *        - fraction_sell
 */
